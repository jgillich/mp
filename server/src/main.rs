#![feature(custom_derive, plugin)]
#![plugin(serde_macros)]

extern crate iron;
extern crate mount;
extern crate router;
extern crate walkdir;
extern crate id3;
extern crate crypto;
extern crate chill;
extern crate dotenv;
extern crate uuid;
extern crate serde;
extern crate serde_json;

use dotenv::dotenv;
use iron::Iron;
use mount::Mount;
use backends::Backends;
pub use error::Error;

macro_rules! db {
    () => {
        {
          use std::env;
          use chill;
          // TODO can this fail at runtime, or only during initialisation?
          // let url = try!(env::var("DATABASE_URL"));
          // try!(chill::Client::new(&url))
          let url = env::var("DATABASE_URL").unwrap();
          chill::Client::new(&url).unwrap()
        }
    };
}

fn main() {
    dotenv().ok();
    init_db();

    let mut mount = Mount::new();
    let backends = Backends::new();
    backends.index();

    mount.mount("/v1/backends", backends);

    Iron::new(mount).http("localhost:3000").unwrap();
}

fn init_db() {
    let db = db!();
    let paths = vec![ "/tracks" ];

    for path in paths {
        if let Err(e) = db.create_database("/tracks").run() {
            match e {
                chill::Error::DatabaseExists(err) => (),
                _ => panic!("failed to initialize database"),
            }
        }
    }
}



mod models;
mod backends;
mod error;
