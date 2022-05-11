use cosmwasm_std::Addr;
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Post {
    title: String,
    description: String,
    image: String,
    likes: Vec<String>,
    user: Addr,
}

impl Post {
    pub fn new(title: String, description: String, image: String, user: Addr) -> Post {
        Post {
            title,
            description,
            image,
            user,
            likes: Vec::new(),
        }
    }

    pub fn like(&mut self, addr: Addr) {
        let liked = self.likes.iter().position(|x| *x == addr.as_str());
        match liked {
            Some(index) => {
                self.likes.remove(index);
            }
            None => {
                self.likes.push(addr.into_string());
            }
        }
    }

    pub fn get_title(&self) -> &String {
        &self.title
    }

    pub fn get_description(&self) -> &String {
        &self.description
    }

    pub fn get_image(&self) -> &String {
        &self.image
    }

    pub fn get_likes(&self) -> &Vec<String> {
        &self.likes
    }

    pub fn get_user(&self) -> &Addr {
        &self.user
    }
}
