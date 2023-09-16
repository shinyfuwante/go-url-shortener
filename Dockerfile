FROM golang:latest

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -o url-shortener-api .

EXPOSE 8080

CMD ["./url-shortener-api"]