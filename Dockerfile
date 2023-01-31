# Use the official Node.js image as the base image
FROM node:19.5.0-alpine3.17

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the application dependencies
RUN npm install --omit=dev

# Copy the rest of the application files to the container
COPY . .

# Expose the port that the container will listen on
EXPOSE 3003

# Specify the command to run when the container starts
CMD ["npm", "start"]
