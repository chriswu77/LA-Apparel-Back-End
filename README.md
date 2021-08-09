# LA Apparel (Back End)

## Motivation
The goal of the back end portion of LA Apparel (a retail e-commerce web app) was to create a microservice able to handle high volumes of production traffic. 

## Highlights
- created a RESTful API using Node.js, Express and PostgreSQL
- employed NGINX as a load balancer using the IP Hash technique
- implemented TTL caching
- deployed microservice through 5 AWS EC2 instances (1 NGINX, 1 PostgreSQL database, 3 Express servers)

**Achieved 6300 RPS with 63ms latency and 0% error rate when load testing with Loader.io**
![Screen Shot 2021-07-24 at 3 28 11 AM](https://user-images.githubusercontent.com/67673070/128659154-09d1bd0c-dfd1-4b04-9553-91edf1f9d773.png)

## Technologies used
- Node.js
- Express
- PostgreSQL
- NGINX
- Jest + SuperTest
