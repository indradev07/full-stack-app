# Use Node.js for building the frontend
FROM node:18-alpine as build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Copy the rest of the app and build it
COPY . .
RUN npm run build

# Serve the app using Nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
