BEGIN TRANSACTION;



INSERT INTO users (username,password_hash,role) VALUES ('user','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_USER');
INSERT INTO users (username,password_hash,role) VALUES ('admin','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_ADMIN');

INSERT INTO users (username,password_hash,role) VALUES ('madeline','$2a$10$QGyZ.Uv5/QgOkbZg3nko0emVckRP4qmUzx/UQ4bHTP9vs2P6bM1G2','ROLE_ADMIN');
INSERT INTO users (username,password_hash,role) VALUES ('andy','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_ADMIN');

INSERT INTO adminuser_band (band_id, user_id)  VALUES ('0fgYKF9Avljex0L9Wt5b8Z', 3);
INSERT INTO adminuser_band (band_id, user_id) VALUES ('41lcf5k3PkUdxupYLkcjCd', 4);

INSERT INTO notifications (spotify_band_id, message) VALUES ('7muzHifhMdnfN1xncRLOqk', 'Calling all fans! Check out our new tour dates.');
INSERT INTO notifications (spotify_band_id, message) VALUES ('7muzHifhMdnfN1xncRLOqk', 'Calling all fans! Check out our new tour dates.');
INSERT INTO notifications (spotify_band_id, message) VALUES ('0LcJLqbBmaGUft1e9Mm8HV', 'Calling all fans! Check out our new tour dates.');
INSERT INTO notifications (spotify_band_id, message) VALUES ('3YQKmKGau1PzlVlkL1iodx', 'Calling all fans! Check out our new tour dates.');
INSERT INTO notifications (spotify_band_id, message) VALUES ('7hJcb9fa4alzcOq3EaNPoG', 'Calling all fans! Check out our new tour dates.');
INSERT INTO notifications (spotify_band_id, message) VALUES ('711MCceyCBcFnzjGY4Q7Un', 'Calling all fans! Check out our new tour dates.');


INSERT INTO featured_bands (spotify_band_id) VALUES ('7muzHifhMdnfN1xncRLOqk');
INSERT INTO featured_bands (spotify_band_id) VALUES ('0LcJLqbBmaGUft1e9Mm8HV');
INSERT INTO featured_bands (spotify_band_id) VALUES ('3YQKmKGau1PzlVlkL1iodx');
INSERT INTO featured_bands (spotify_band_id) VALUES ('7hJcb9fa4alzcOq3EaNPoG');
INSERT INTO featured_bands (spotify_band_id) VALUES ('711MCceyCBcFnzjGY4Q7Un');


COMMIT TRANSACTION;
