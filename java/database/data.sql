BEGIN TRANSACTION;



INSERT INTO users (username,password_hash,user_role) VALUES ('user','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_USER');
INSERT INTO users (username,password_hash,user_role) VALUES ('admin','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_ADMIN');

INSERT INTO featured_bands (spotify_band_id) VALUES ('7muzHifhMdnfN1xncRLOqk');
INSERT INTO featured_bands (spotify_band_id) VALUES ('0LcJLqbBmaGUft1e9Mm8HV');
INSERT INTO featured_bands (spotify_band_id) VALUES ('3YQKmKGau1PzlVlkL1iodx');
INSERT INTO featured_bands (spotify_band_id) VALUES ('7hJcb9fa4alzcOq3EaNPoG');
INSERT INTO featured_bands (spotify_band_id) VALUES ('711MCceyCBcFnzjGY4Q7Un');


COMMIT TRANSACTION;
