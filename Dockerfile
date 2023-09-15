# Use the official Node.js base image
FROM node:16

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install server dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the server's port (change this if your server listens on a different port)
EXPOSE 5000

# Set the environment variables
ENV MONGO_CONNECTION="mongodb+srv://manuelespinosa:jbQYNwRbVsIcl3VZ@furniturebd.jqi3d.mongodb.net/sisige?retryWrites=true&w=majority"
ENV URL="http://localhost:5000/"
ENV SALTROUNDS=10
ENV JWT_SECRET="34a578500be9ee63f3193ce2cc264e6762371f00ac9d12edb218ccf3fa1d6082"
ENV PORT=5000

# Command to start the server
CMD ["npm", "start"]
