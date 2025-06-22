-- MySQL database schema for vehicle management system

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('driver', 'manager') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE photos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  photo_url VARCHAR(255) NOT NULL,
  timestamp DATETIME NOT NULL,
  latitude DECIMAL(10, 7),
  longitude DECIMAL(10, 7),
  watermark_text VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE checklist_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  description VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE checklist_responses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  checklist_item_id INT NOT NULL,
  photo_url VARCHAR(255) NOT NULL,
  observation TEXT,
  timestamp DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (checklist_item_id) REFERENCES checklist_items(id)
);

CREATE TABLE app_versions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  version_number VARCHAR(50) NOT NULL,
  apk_url VARCHAR(255) NOT NULL,
  release_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_app_versions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  app_version_id INT NOT NULL,
  installed_at DATETIME NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (app_version_id) REFERENCES app_versions(id)
);
