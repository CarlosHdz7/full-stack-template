
CREATE DATABASE IF NOT EXISTS mydb;
USE mydb;


CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE roles (
  role_id INT AUTO_INCREMENT PRIMARY KEY,
  role_name VARCHAR(50) NOT NULL UNIQUE,
  description VARCHAR(255),
  is_system_role BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE user_roles (
  user_role_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  role_id INT NOT NULL,
  assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (role_id) REFERENCES roles(role_id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_role (user_id, role_id)
);


CREATE TABLE resources (
  resource_id INT AUTO_INCREMENT PRIMARY KEY,
  resource_code VARCHAR(100) NOT NULL UNIQUE,
  resource_name VARCHAR(100) NOT NULL,
  resource_type ENUM('PAGE', 'SIDEBAR_ITEM', 'COMPONENT', 'API_ENDPOINT') NOT NULL,
  parent_id INT NULL,
  module_conde VARCHAR(100),
  display_order INT DEFAULT 0,
  icon VARCHAR(50),
  path VARCHAR(255),
  description VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES resources(resource_id) ON DELETE SET NULL
);


CREATE TABLE permissions (
  permission_id INT AUTO_INCREMENT PRIMARY KEY,
  permission_code VARCHAR(100) NOT NULL UNIQUE,
  permission_name VARCHAR(100) NOT NULL,
  description VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE resource_permissions (
  resource_permission_id INT AUTO_INCREMENT PRIMARY KEY,
  resource_id INT NOT NULL,
  permission_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (resource_id) REFERENCES resources(resource_id) ON DELETE CASCADE,
  FOREIGN KEY (permission_id) REFERENCES permissions(permission_id) ON DELETE CASCADE,
  UNIQUE KEY unique_resource_permission (resource_id, permission_id)
);


CREATE TABLE role_permissions (
  role_permission_id INT AUTO_INCREMENT PRIMARY KEY,
  role_id INT NOT NULL,
  resource_id INT NOT NULL,
  permission_id INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (role_id) REFERENCES roles(role_id) ON DELETE CASCADE,
  FOREIGN KEY (resource_id) REFERENCES resources(resource_id) ON DELETE CASCADE,
  FOREIGN KEY (permission_id) REFERENCES permissions(permission_id) ON DELETE CASCADE,
  UNIQUE KEY unique_role_resource_permission (role_id, resource_id, permission_id)
);


-- Índices adicionales sugeridos
CREATE INDEX idx_user_roles_user_id ON user_roles(user_id);
CREATE INDEX idx_role_permissions_role_id ON role_permissions(role_id);
CREATE INDEX idx_role_permissions_resource_id ON role_permissions(resource_id);
CREATE INDEX idx_resource_permissions_resource_id ON resource_permissions(resource_id);
CREATE INDEX idx_resources_parent_id ON resources(parent_id);


-- Crear usuario
DROP PROCEDURE IF EXISTS sp_create_user;
CREATE PROCEDURE sp_create_user(
  IN p_username VARCHAR(50),
  IN p_email VARCHAR(100),
  IN p_password_hash VARCHAR(255)
)
BEGIN
  INSERT INTO users (username, email, password_hash)
  VALUES (p_username, p_email, p_password_hash);
END;


-- Actualizar usuario
DROP PROCEDURE IF EXISTS sp_update_user;
CREATE PROCEDURE sp_update_user(
  IN p_id INT,
  IN p_username VARCHAR(50),
  IN p_email VARCHAR(100)
)
BEGIN
  UPDATE users SET username = p_username, email = p_email
  WHERE user_id = p_id;
END;

-- Eliminar usuario
DROP PROCEDURE IF EXISTS sp_delete_user;
CREATE PROCEDURE sp_delete_user(IN p_id INT)
BEGIN
  DELETE FROM users WHERE user_id = p_id;
END;

-- Crear rol
DROP PROCEDURE IF EXISTS sp_create_role;
CREATE PROCEDURE sp_create_role(IN p_role_name VARCHAR(50), IN p_description VARCHAR(255))
BEGIN
  INSERT INTO roles (role_name, description) VALUES (p_role_name, p_description);
END;

-- Crear permiso
DROP PROCEDURE IF EXISTS sp_create_permission;
CREATE PROCEDURE sp_create_permission(
  IN p_permission_code VARCHAR(100),
  IN p_permission_name VARCHAR(100),
  IN p_description TEXT
)
BEGIN
  INSERT INTO permissions (permission_code, permission_name, description)
  VALUES (p_permission_code, p_permission_name, p_description);
END;

-- Asignar rol a usuario
DROP PROCEDURE IF EXISTS sp_assign_role;
CREATE PROCEDURE sp_assign_role(IN p_user_id INT, IN p_role_id INT)
BEGIN
  INSERT IGNORE INTO user_roles (user_id, role_id)
  VALUES (p_user_id, p_role_id);
END;

-- Asignar permiso a recurso
DROP PROCEDURE IF EXISTS sp_create_resource_permission;
CREATE PROCEDURE sp_create_resource_permission(
  IN p_resource_id INT,
  IN p_permission_id INT
)
BEGIN
  INSERT IGNORE INTO resource_permissions(resource_id, permission_id)
  VALUES (p_resource_id, p_permission_id);
END;

-- Asignar permiso a rol en recurso
DROP PROCEDURE IF EXISTS sp_assign_permission_to_role;
CREATE PROCEDURE sp_assign_permission_to_role(
  IN p_role_id INT,
  IN p_resource_id INT,
  IN p_permission_id INT
)
BEGIN
  INSERT IGNORE INTO role_permissions(role_id, resource_id, permission_id)
  VALUES (p_role_id, p_resource_id, p_permission_id);
END;

-- Crear recurso
DROP PROCEDURE IF EXISTS sp_create_resource;
CREATE PROCEDURE sp_create_resource(
  IN p_resource_code VARCHAR(100),
  IN p_resource_name VARCHAR(100),
  IN p_resource_type ENUM('PAGE', 'SIDEBAR_ITEM', 'COMPONENT', 'API_ENDPOINT'),
  IN p_parent_id INT,
  IN p_module_code VARCHAR(100),
  IN p_display_order INT,
  IN p_icon VARCHAR(50),
  IN p_path VARCHAR(255),
  IN p_description VARCHAR(255)
)
BEGIN
  INSERT INTO resources (
    resource_code, resource_name, resource_type, parent_id,
    module_conde, display_order, icon, path, description
  )
  VALUES (
    p_resource_code, p_resource_name, p_resource_type, p_parent_id,
    p_module_code, p_display_order, p_icon, p_path, p_description
  );
END;


CREATE PROCEDURE sp_login_user(IN p_email VARCHAR(100))
BEGIN
  DECLARE v_user_id INT;

  -- Obtener el ID del usuario
  SELECT user_id INTO v_user_id
  FROM users
  WHERE email = p_email AND is_active = TRUE
  LIMIT 1;

  -- Validar si existe el usuario
  IF v_user_id IS NOT NULL THEN

    -- Retornar la info básica del usuario y sus roles
    SELECT 
      u.user_id,
      u.username,
      u.email,
      u.password_hash,
      JSON_ARRAYAGG(
        JSON_OBJECT(
          'role_id', r.role_id,
          'role_name', r.role_name
        )
      ) AS roles,
      
      -- Accesos del usuario en formato JSON
      (
        SELECT JSON_ARRAYAGG(
          JSON_OBJECT(
            'resource_code', r.resource_code,
            'resource_name', r.resource_name,
            'resource_type', r.resource_type,
            'icon', r.icon,
            'path', r.path,
            'children', COALESCE((
              SELECT JSON_ARRAYAGG(
                JSON_OBJECT(
                  'resource_code', r2.resource_code,
                  'resource_name', r2.resource_name,
                  'resource_type', r2.resource_type,
                  'icon', r2.icon,
                  'path', r2.path
                )
              )
              FROM resources r2
              JOIN role_permissions rp2 ON rp2.resource_id = r2.resource_id
              JOIN user_roles ur2 ON ur2.role_id = rp2.role_id
              WHERE r2.parent_id = r.resource_id AND ur2.user_id = v_user_id
            ), JSON_ARRAY())
          )
        )
        FROM resources r
        JOIN role_permissions rp ON rp.resource_id = r.resource_id
        JOIN user_roles ur ON ur.role_id = rp.role_id
        WHERE r.parent_id IS NULL AND ur.user_id = v_user_id
      ) AS user_access_json

    FROM users u
    LEFT JOIN user_roles ur ON ur.user_id = u.user_id
    LEFT JOIN roles r ON r.role_id = ur.role_id
    WHERE u.user_id = v_user_id
    GROUP BY u.user_id;

  END IF;
END;
