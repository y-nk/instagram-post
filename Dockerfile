# Use an official Ubuntu 20.04 image as the base image
FROM ubuntu:20.04

# Install Node.js 16 and Yarn
RUN apt-get update && \
  apt-get install -y curl gnupg && \
  curl -sL https://deb.nodesource.com/setup_18.x | bash - && \
  apt-get install -y nodejs

# Install Playwright dependencies
RUN apt-get install -y libglib2.0-0 libnss3 libnspr4 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdbus-1-3 libatspi2.0-0 libx11-6 libxcomposite1 libxdamage1 libxext6 libxfixes3 libxrandr2 libgbm1 libdrm2 libxcb1 libxkbcommon0 libpango-1.0-0 libcairo2 libasound2

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and yarn.lock files to the container
COPY package.json package-lock.json ./

# Install the dependencies using yarn
RUN npm install 

# Install playwright browsers
RUN npx playwright install chromium

# Copy the rest of the application code to the container
COPY . .

# Code file to execute when the docker container starts up (`run.sh`)
ENTRYPOINT ["./run.sh"]
