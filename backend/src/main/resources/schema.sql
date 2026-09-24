-- ============================================================
-- Online Salon Booking System - Database Schema (SQL Server Reference)
-- Note: Tables are auto-managed by JPA Hibernate (ddl-auto=update)
-- Run this script manually in SSMS only if needed.
-- ============================================================

-- Create Database (run separately in SSMS if not exists)
-- CREATE DATABASE salon_db;
-- GO
-- USE salon_db;
-- GO

-- Users Table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='users' AND xtype='U')
CREATE TABLE users (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    full_name NVARCHAR(100) NOT NULL,
    email NVARCHAR(100) NOT NULL UNIQUE,
    password NVARCHAR(255) NOT NULL,
    phone NVARCHAR(20),
    role NVARCHAR(20) DEFAULT 'CUSTOMER' CHECK (role IN ('CUSTOMER', 'ADMIN')),
    created_at DATETIME2 DEFAULT GETDATE()
);

-- Services Table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='services' AND xtype='U')
CREATE TABLE services (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    service_name NVARCHAR(100) NOT NULL,
    description NVARCHAR(MAX),
    price DECIMAL(10, 2) NOT NULL,
    duration INT NOT NULL,
    image NVARCHAR(255)
);

-- Staff Table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='staff' AND xtype='U')
CREATE TABLE staff (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    full_name NVARCHAR(100) NOT NULL,
    specialization NVARCHAR(100),
    phone NVARCHAR(20),
    email NVARCHAR(100),
    availability BIT DEFAULT 1
);

-- Appointments Table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='appointments' AND xtype='U')
CREATE TABLE appointments (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    user_id BIGINT NOT NULL,
    service_id BIGINT NOT NULL,
    staff_id BIGINT,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    status NVARCHAR(20) DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED')),
    created_at DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (service_id) REFERENCES services(id),
    FOREIGN KEY (staff_id) REFERENCES staff(id)
);

-- Payments Table
IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='payments' AND xtype='U')
CREATE TABLE payments (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    appointment_id BIGINT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    payment_method NVARCHAR(50),
    payment_status NVARCHAR(20) DEFAULT 'PENDING' CHECK (payment_status IN ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED')),
    created_at DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (appointment_id) REFERENCES appointments(id)
);
