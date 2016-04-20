use id3::Tag;
use chill;
use machine_id::MachineId;
use super::{Index, Indexer};
use walkdir::{DirEntry, WalkDir};
use {DecodedTrack, User, Error, FileBackend, Uri, FileUri};

impl Indexer<FileBackend> for Index {
    fn index(db: &chill::Client, user: &User, backend: &FileBackend) -> Result<(), Error> {

        let mut tracks: Vec<DecodedTrack> = Vec::new();
        let machine_id = format!("{}", MachineId::get()); // FIXME reimplement machine_id crate

        for path in backend.paths.iter() {
            for entry in walk_path(&path) {
                if let Ok(tag) = Tag::read_from_path(entry.path()) {
                    let uri = FileUri::new(&machine_id, &path);

                    tracks.push(DecodedTrack {
                        artist: tag.artist().unwrap_or("").into(),
                        album: tag.album().unwrap_or("").into(),
                        name: tag.title().unwrap_or("").into(),
                        number: tag.track().unwrap_or(0),
                        uri: Uri::File(uri),
                    });
                }
            }
        }

        Index::take_result(db, &user.db_name(), tracks)?;
        Ok(())
    }
}

fn is_file_type(e: &DirEntry, ext: &str) -> bool {
    let p = e.path();
    p.is_file() && p.extension().map(|s| s == ext).unwrap_or(false)
}


fn is_music(e: &DirEntry) -> bool {
    is_file_type(e, "mp3") || is_file_type(e, "ogg")
}

fn walk_path(path: &str) -> Vec<DirEntry> {
    WalkDir::new(path)
        .into_iter()
        .filter_map(|e| e.ok())
        .filter(|e| is_music(e))
        .collect()
}
