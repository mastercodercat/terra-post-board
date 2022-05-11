#[cfg(not(feature = "library"))]
use cosmwasm_std::entry_point;
use cosmwasm_std::{to_binary, Addr, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdResult};
use cw2::set_contract_version;

use crate::error::ContractError;
use crate::models::post::Post;
use crate::msg::{ExecuteMsg, InstantiateMsg, PostsResponse, QueryMsg};
use crate::state::{State, STATE};

// version info for migration info
const CONTRACT_NAME: &str = "crates.io:post_board";
const CONTRACT_VERSION: &str = env!("CARGO_PKG_VERSION");

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    _msg: InstantiateMsg,
) -> Result<Response, ContractError> {
    let state = State {
        posts: Vec::new(),
        owner: info.sender.clone(),
    };
    set_contract_version(deps.storage, CONTRACT_NAME, CONTRACT_VERSION)?;
    STATE.save(deps.storage, &state)?;

    Ok(Response::new().add_attribute("method", "instantiate"))
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn execute(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, ContractError> {
    match msg {
        ExecuteMsg::CreatePost {
            title,
            description,
            image,
        } => try_create(deps, info, title, description, image),
        ExecuteMsg::LikePost { index } => try_like(deps, info, index),
    }
}

pub fn try_create(
    deps: DepsMut,
    info: MessageInfo,
    title: String,
    description: String,
    image: String,
) -> Result<Response, ContractError> {
    STATE.update(deps.storage, |mut state| -> Result<_, ContractError> {
        state
            .posts
            .push(Post::new(title, description, image, info.sender));
        Ok(state)
    })?;

    Ok(Response::new().add_attribute("method", "try_create"))
}

pub fn try_like(deps: DepsMut, info: MessageInfo, index: u32) -> Result<Response, ContractError> {
    STATE.update(deps.storage, |mut state| -> Result<_, ContractError> {
        let post = state.posts.get_mut(index as usize);
        match post {
            Some(post) => {
                post.like(info.sender);
                Ok(state)
            }
            None => Err(ContractError::PostDoesNotExist {}),
        }
    })?;

    Ok(Response::new().add_attribute("method", "try_like"))
}

#[cfg_attr(not(feature = "library"), entry_point)]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetPosts {} => to_binary(&query_posts(deps)?),
        QueryMsg::GetPostsByUser { addr } => to_binary(&query_posts_by_user(deps, addr)?),
    }
}

fn query_posts(deps: Deps) -> StdResult<PostsResponse> {
    let state = STATE.load(deps.storage)?;

    Ok(PostsResponse { posts: state.posts })
}

fn query_posts_by_user(deps: Deps, addr: Addr) -> StdResult<PostsResponse> {
    let state = STATE.load(deps.storage)?;
    let posts = state
        .posts
        .iter()
        .filter(|&post| addr.eq(post.get_user()))
        .cloned()
        .collect::<Vec<Post>>();

    Ok(PostsResponse { posts: posts })
}

#[cfg(test)]
mod tests {
    use super::*;
    use cosmwasm_std::testing::{mock_dependencies, mock_env, mock_info};
    use cosmwasm_std::{coins, from_binary};

    #[test]
    fn proper_initialization() {
        let mut deps = mock_dependencies(&[]);

        let msg = InstantiateMsg { posts: Vec::new() };
        let info = mock_info("creator", &coins(1000, "earth"));

        // we can just call .unwrap() to assert this was a success
        let res = instantiate(deps.as_mut(), mock_env(), info, msg).unwrap();
        assert_eq!(0, res.messages.len());

        // it worked, let's query the state
        let res = query(deps.as_ref(), mock_env(), QueryMsg::GetPosts {}).unwrap();
        let value: PostsResponse = from_binary(&res).unwrap();
        let expected: Vec<Post> = Vec::new();

        assert_eq!(expected, value.posts);
    }

    #[test]
    fn create_post() {
        let mut deps = mock_dependencies(&coins(2, "token"));
        let msg = InstantiateMsg { posts: Vec::new() };
        let info = mock_info("creator", &coins(2, "token"));
        let _res = instantiate(deps.as_mut(), mock_env(), info, msg).unwrap();

        let info = mock_info("anyone", &coins(2, "token"));

        let msg = ExecuteMsg::CreatePost {
            title: String::from("Post title"),
            description: String::from("Post description"),
            image: String::from("image.png"),
        };
        let _res = execute(deps.as_mut(), mock_env(), info, msg).unwrap();

        let res = query(deps.as_ref(), mock_env(), QueryMsg::GetPosts {}).unwrap();
        let value: PostsResponse = from_binary(&res).unwrap();
        let posts: Vec<Post> = value.posts;

        assert_eq!(1, posts.len());
        assert_eq!("Post title", posts.get(0).unwrap().get_title());
        assert_eq!("Post description", posts.get(0).unwrap().get_description());
        assert_eq!("image.png", posts.get(0).unwrap().get_image());
        assert_eq!(0, posts.get(0).unwrap().get_likes().len());
    }

    #[test]
    fn like_post() {
        let mut deps = mock_dependencies(&coins(2, "token"));
        let msg = InstantiateMsg { posts: Vec::new() };
        let info = mock_info("creator", &coins(2, "token"));
        let _res = instantiate(deps.as_mut(), mock_env(), info, msg).unwrap();

        let info = mock_info("anyone", &coins(2, "token"));

        let msg = ExecuteMsg::CreatePost {
            title: String::from("Post title"),
            description: String::from("Post description"),
            image: String::from("image.png"),
        };
        let _res = execute(deps.as_mut(), mock_env(), info, msg).unwrap();

        let info = mock_info("anyone", &coins(2, "token"));
        let msg = ExecuteMsg::LikePost { index: 0 };
        let _res = execute(deps.as_mut(), mock_env(), info, msg).unwrap();

        let res = query(deps.as_ref(), mock_env(), QueryMsg::GetPosts {}).unwrap();
        let value: PostsResponse = from_binary(&res).unwrap();
        let posts: &Post = value.posts.get(0).unwrap();

        assert_eq!(1, posts.get_likes().len());
    }
}
