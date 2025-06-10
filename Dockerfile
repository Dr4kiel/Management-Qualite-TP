FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json ./
COPY package-lock.json ./

# Install dependencies
RUN npm install

# Define build-time argument
ARG DATABASE_URL

# Set environment variable
ENV DATABASE_URL=${DATABASE_URL}

# Copy the rest of the application code
COPY . .

RUN chmod +x ./scripts/init-prisma.sh

# Generate Prisma client
&& npx prisma generate

# Build the Next.js application
&& npm run build

# Expose the port the app runs on
EXPOSE 3000

# Start the application and run the Prisma script
CMD ["sh", "-c", "./scripts/init-prisma.sh && npm run start"]