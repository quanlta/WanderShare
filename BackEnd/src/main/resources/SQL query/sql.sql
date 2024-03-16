USE [BirdShopCrea]
GO
/****** Object:  Table [dbo].[address]    Script Date: 10/17/2023 2:41:00 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[address](
    [id] [int] NOT NULL,
    [user_id] [varchar](255) NOT NULL,
    [street_name] [varchar](255) NOT NULL,
    [district] [varchar](255) NOT NULL,
    [city] [varchar](255) NOT NULL,
    PRIMARY KEY CLUSTERED
(
[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    ) ON [PRIMARY]
    GO
/****** Object:  Table [dbo].[category]    Script Date: 10/17/2023 2:41:00 PM ******/
    SET ANSI_NULLS ON
    GO
    SET QUOTED_IDENTIFIER ON
    GO
CREATE TABLE [dbo].[category](
    [id] [int] NOT NULL,
    [name] [varchar](100) NOT NULL,
    PRIMARY KEY CLUSTERED
(
[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    ) ON [PRIMARY]
    GO
/****** Object:  Table [dbo].[order_detail]    Script Date: 10/17/2023 2:41:00 PM ******/
    SET ANSI_NULLS ON
    GO
    SET QUOTED_IDENTIFIER ON
    GO
CREATE TABLE [dbo].[order_detail](
    [id] [int] NOT NULL,
    [address_id] [int] NOT NULL,
    [user_id] [varchar](255) NOT NULL,
    [shipping_address] [text] NOT NULL,
    [order_date] [date] NOT NULL,
    [payment_method] [bit] NOT NULL,
    [order_total] [numeric](10, 2) NOT NULL,
    [order_status] [int] NOT NULL,
    PRIMARY KEY CLUSTERED
(
[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    ) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
    GO
/****** Object:  Table [dbo].[order_item]    Script Date: 10/17/2023 2:41:00 PM ******/
    SET ANSI_NULLS ON
    GO
    SET QUOTED_IDENTIFIER ON
    GO
CREATE TABLE [dbo].[order_item](
    [id] [int] NOT NULL,
    [product_item_id] [int] NOT NULL,
    [quantity] [int] NOT NULL,
    [price] [numeric](10, 2) NOT NULL,
    [order_detail_id] [int] NOT NULL,
    PRIMARY KEY CLUSTERED
(
[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    ) ON [PRIMARY]
    GO
/****** Object:  Table [dbo].[product_item]    Script Date: 10/17/2023 2:41:00 PM ******/
    SET ANSI_NULLS ON
    GO
    SET QUOTED_IDENTIFIER ON
    GO
CREATE TABLE [dbo].[product_item](
    [id] [int] NOT NULL,
    [category_id] [int] NULL,
    [name] [varchar](255) NOT NULL,
    [description] [text] NOT NULL,
    [amount] [int] NOT NULL,
    [price] [numeric](10, 2) NOT NULL,
    [product_image] [varchar](255) NOT NULL,
    [is_customer] [bit] NULL,
    [is_post] [bit] NULL,
    PRIMARY KEY CLUSTERED
(
[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    ) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
    GO
/****** Object:  Table [dbo].[roles]    Script Date: 10/17/2023 2:41:00 PM ******/
    SET ANSI_NULLS ON
    GO
    SET QUOTED_IDENTIFIER ON
    GO
CREATE TABLE [dbo].[roles](
    [id] [int] NOT NULL,
    [name] [nvarchar](50) NULL,
    PRIMARY KEY CLUSTERED
(
[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    ) ON [PRIMARY]
    GO
/****** Object:  Table [dbo].[user_review]    Script Date: 10/17/2023 2:41:00 PM ******/
    SET ANSI_NULLS ON
    GO
    SET QUOTED_IDENTIFIER ON
    GO
CREATE TABLE [dbo].[user_review](
    [id] [int] NOT NULL,
    [user_id] [varchar](255) NOT NULL,
    [product_item_id] [int] NOT NULL,
    [rating_value] [real] NOT NULL,
    [comment] [text] NOT NULL,
    PRIMARY KEY CLUSTERED
(
[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    ) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
    GO
/****** Object:  Table [dbo].[user_role]    Script Date: 10/17/2023 2:41:00 PM ******/
    SET ANSI_NULLS ON
    GO
    SET QUOTED_IDENTIFIER ON
    GO
CREATE TABLE [dbo].[user_role](
    [user_id] [varchar](255) NOT NULL,
    [role_id] [int] NOT NULL,
    PRIMARY KEY CLUSTERED
(
    [user_id] ASC,
[role_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    ) ON [PRIMARY]
    GO
/****** Object:  Table [dbo].[users]    Script Date: 10/17/2023 2:41:00 PM ******/
    SET ANSI_NULLS ON
    GO
    SET QUOTED_IDENTIFIER ON
    GO
CREATE TABLE [dbo].[users](
    [user_id] [varchar](255) NOT NULL,
    [username] [varchar](255) NOT NULL,
    [password] [varchar](255) NOT NULL,
    [email] [varchar](255) NOT NULL,
    [phone] [varchar](255) NOT NULL,
    PRIMARY KEY CLUSTERED
(
[user_id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
    ) ON [PRIMARY]
    GO
    INSERT [dbo].[category] ([id], [name]) VALUES (1, N'Category 1')
    INSERT [dbo].[category] ([id], [name]) VALUES (2, N'Category 2')
    INSERT [dbo].[category] ([id], [name]) VALUES (3, N'Category 3')
    GO
    INSERT [dbo].[product_item] ([id], [category_id], [name], [description], [amount], [price], [product_image], [is_customer], [is_post]) VALUES (1, 1, N'Product A', N'Description for Product A', 50, CAST(19.99 AS Numeric(10, 2)), N'productA.jpg', 1, 0)
    INSERT [dbo].[product_item] ([id], [category_id], [name], [description], [amount], [price], [product_image], [is_customer], [is_post]) VALUES (2, 1, N'Product B', N'Description for Product B', 30, CAST(29.99 AS Numeric(10, 2)), N'productB.jpg', 0, 1)
    INSERT [dbo].[product_item] ([id], [category_id], [name], [description], [amount], [price], [product_image], [is_customer], [is_post]) VALUES (3, 2, N'Chimm', N'Description for Product C', 20, CAST(39.99 AS Numeric(10, 2)), N'productC.jpg', 1, 1)
    GO
    INSERT [dbo].[roles] ([id], [name]) VALUES (1, N'ROLE_USER')
    INSERT [dbo].[roles] ([id], [name]) VALUES (2, N'ROLE_ADMIN')
    GO
    INSERT [dbo].[user_role] ([user_id], [role_id]) VALUES (N'thaibs36@gmail.com', 1)
    INSERT [dbo].[user_role] ([user_id], [role_id]) VALUES (N'thaibs38@gmail.com', 1)
    GO
    INSERT [dbo].[users] ([user_id], [username], [password], [email], [phone]) VALUES (N'thaibs36@gmail.com', N'QuangThai', N'$2a$10$BkL3tJNRP5oEMgCufPYoB.Oaa.nHw9UskwFBNBIz.EEQ21HVSyakK', N'thaibs36@gmail.com', N'0847123169')
    INSERT [dbo].[users] ([user_id], [username], [password], [email], [phone]) VALUES (N'thaibs38@gmail.com', N'QuangThai', N'$2a$10$z4PdYEWP.uITRoYHkSlUtOg4DrIhuwhBa.ZPjJK4RQ9wL175C7Kvm', N'thaibs38@gmail.com', N'0847123169')
    GO
ALTER TABLE [dbo].[address]  WITH CHECK ADD FOREIGN KEY([user_id])
    REFERENCES [dbo].[users] ([user_id])
    GO
ALTER TABLE [dbo].[order_detail]  WITH CHECK ADD FOREIGN KEY([address_id])
    REFERENCES [dbo].[address] ([id])
    GO
ALTER TABLE [dbo].[order_detail]  WITH CHECK ADD FOREIGN KEY([user_id])
    REFERENCES [dbo].[users] ([user_id])
    GO
ALTER TABLE [dbo].[order_item]  WITH CHECK ADD FOREIGN KEY([order_detail_id])
    REFERENCES [dbo].[order_detail] ([id])
    GO
ALTER TABLE [dbo].[order_item]  WITH CHECK ADD FOREIGN KEY([product_item_id])
    REFERENCES [dbo].[product_item] ([id])
    GO
ALTER TABLE [dbo].[product_item]  WITH CHECK ADD FOREIGN KEY([category_id])
    REFERENCES [dbo].[category] ([id])
    GO
ALTER TABLE [dbo].[user_review]  WITH CHECK ADD FOREIGN KEY([product_item_id])
    REFERENCES [dbo].[product_item] ([id])
    GO
ALTER TABLE [dbo].[user_review]  WITH CHECK ADD FOREIGN KEY([user_id])
    REFERENCES [dbo].[users] ([user_id])
    GO
ALTER TABLE [dbo].[user_role]  WITH CHECK ADD FOREIGN KEY([role_id])
    REFERENCES [dbo].[roles] ([id])
    GO
ALTER TABLE [dbo].[user_role]  WITH CHECK ADD FOREIGN KEY([user_id])
    REFERENCES [dbo].[users] ([user_id])
    GO
