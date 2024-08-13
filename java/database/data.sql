BEGIN TRANSACTION;



INSERT INTO users (username,password_hash,role) VALUES ('user','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_USER');
INSERT INTO users (username,password_hash,role) VALUES ('admin','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_ADMIN');
INSERT INTO users (username,password_hash,role) VALUES ('madeline','$2a$10$QGyZ.Uv5/QgOkbZg3nko0emVckRP4qmUzx/UQ4bHTP9vs2P6bM1G2','ROLE_ADMIN');

INSERT INTO adminuser_band (band_id, user_id)  VALUES ('7muzHifhMdnfN1xncRLOqk', 3);


INSERT INTO featured_bands (spotify_band_id) VALUES ('7muzHifhMdnfN1xncRLOqk');
INSERT INTO featured_bands (spotify_band_id) VALUES ('0LcJLqbBmaGUft1e9Mm8HV');
INSERT INTO featured_bands (spotify_band_id) VALUES ('3YQKmKGau1PzlVlkL1iodx');
INSERT INTO featured_bands (spotify_band_id) VALUES ('7hJcb9fa4alzcOq3EaNPoG');
INSERT INTO featured_bands (spotify_band_id) VALUES ('711MCceyCBcFnzjGY4Q7Un');


COMMIT TRANSACTION;
