# AppDoll

## [See the App!](#)

![App Logo](path-to-your-logo.png)

## Description

AppDoll is a marketplace application for **collectible dolls**.  
Users can browse, buy, sell, and comment on dolls such as Barbie, Bratz, and others.  
The project includes both **frontend and backend**.

#### [Client Repo here](#)
#### [Server Repo here](#)

## Backlog Functionalities

- Product filtering by category and price  
- Advanced comment management  
- Chat request system for buyers and sellers  
- Enhanced image upload validations  
- Performance and security improvements  

## Technologies used

- Frontend: React, React Router, Axios, Context API, Tailwind  
- Backend: Node.js, Express.js, MongoDB, Mongoose, JWT  
- Cloudinary for image storage  
- Cors, dotenv  

# Server Structure

## Models

### User model

```javascript
{
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImage: { type: String },
  createdPosts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  createdComments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
}
###Product model


const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

comment model

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});


| HTTP Method | URL                            | Request Body                                 | Success status | Error Status | Description                           |
| ----------- | ------------------------------ | -------------------------------------------- | -------------- | ------------ | ------------------------------------- |
| POST        | `/user`                        | {username, email, password}                  | 201            | 400          | Create a new user                     |
| PUT         | `/user`                        | {username, email, profileImage}              | 200            | 400          | Edit user information                 |
| GET         | `/product`                     |                                              | 200            | 400          | Get all products                      |
| GET         | `/product/:productId`          |                                              | 200            | 400          | Get product details                   |
| POST        | `/product`                     | {title, description, category, price, image} | 201            | 400          | Create a new product                  |
| PUT         | `/product/:productId`          | {title, description, category, price, image} | 200            | 400          | Update product                        |
| DELETE      | `/product/:productId`          |                                              | 200            | 400          | Delete product                        |
| POST        | `/comments`                    | {user, product, content}                     | 201            | 400          | Create a new comment                  |
| GET         | `/product/:productId/comments` |                                              | 200            | 400          | Get all comments for a product        |
| DELETE      | `/comments/:id`                |                                              | 200            | 400          | Delete a comment                      |
| POST        | `/api/upload`                  | {image}                                      | 200            | 400          | Upload a product image via Cloudinary |



Links
Collaborators

Maylis

Project

Repository Link Client:https://github.com/maylis-dev/client-app.git

Repository Link Server: https://github.com/maylis-dev/server-dolls.git

Deploy Link : client-app-5rw6-r8ncjs8hk-maylis-projects-a46141bb.vercel.app

Trello

Link to your trello board

Slides

Slides Link
