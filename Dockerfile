# Use the official Node.js image as the base image
FROM node:lts-alpine

# set for production, or use --omit=dev when installing deps
ENV NODE_ENV production

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the application dependencies
RUN npm ci --omit=dev

# Copy the rest of the application files to the container (some files will be skipped, check .dockerignore file)
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# Expose the port that the container will listen on
EXPOSE 3000

# Specify the command to run when the container starts
CMD ["npm", "start"]