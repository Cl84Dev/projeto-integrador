-- Tabela customers
CREATE TABLE IF NOT EXISTS customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Tabela accounts
CREATE TABLE IF NOT EXISTS accounts (
    account_id INT AUTO_INCREMENT PRIMARY KEY,
    account_number VARCHAR(20) NOT NULL UNIQUE,
    customer_id INT NOT NULL,
    balance DECIMAL(15,2) NOT NULL DEFAULT 1000.00,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id) ON DELETE CASCADE
);

-- Tabela transactions
CREATE TABLE IF NOT EXISTS transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    date_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    type ENUM('recebimento', 'pagamento', 'transferencia') NOT NULL,
    value DECIMAL(15,2) NOT NULL,
    origin_account_id INT,
    target_account_id INT,
    description VARCHAR(255),
    FOREIGN KEY (origin_account_id) REFERENCES accounts(account_id) ON DELETE SET NULL,
    FOREIGN KEY (target_account_id) REFERENCES accounts(account_id) ON DELETE SET NULL
);

-- Tabela bills_to_pay
CREATE TABLE IF NOT EXISTS bills_to_pay (
    bill_to_pay_id INT AUTO_INCREMENT PRIMARY KEY,
    account_id INT NOT NULL,
    description VARCHAR(255) NOT NULL,
    value DECIMAL(15,2) NOT NULL,
    status ENUM('pago', 'em_aberto') NOT NULL,
    date_due DATE NOT NULL,
    FOREIGN KEY (account_id) REFERENCES accounts(account_id) ON DELETE CASCADE
);
