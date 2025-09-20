# Step 1: Use Node.js base image
FROM node:18

# Step 2: Set working directory
WORKDIR /app

# Step 3: Copy package.json & package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install --production

# Step 5: Copy all source code
COPY . .

# Step 6: Expose backend port
EXPOSE 5000

# Step 7: Start the server
CMD ["npm", "start"]
