# POSTECH CSDE425 Project 8 LLM on RasberryPI
![Pasted image 20241124210612](https://github.com/user-attachments/assets/c468549f-d92c-464f-a00e-d41e41067099)
 This repository is Project8 codes of POSTECH CSDE425 Embedded System Programming Lecture by Eunhyeok Park. 
You can test on http://141.223.106.27:3000/. However, The server will stop with high probability 🥲. If you want to test this project, I highly recommand run this on your own PC(or edge device). I took cared a lot to dockerize(Some part is still naive but It works though 😅).
## Dependency
### Hardware
- More than 10GB storage is needed.
  - To install docker images & LLM models
- We verified these hardwares
  - RasberryPI5 w latest RabianOS
  - X86 CPUs(Intel and Ryzen series CPU) w Ubuntu 20.04 and 22.04
  - M1 Max CPU w macOS 15

## How to install
### Docker bring up
```sh
git clone https://github.com/tlemsl/ChatBot.git
cd ChatBot/chat-server
docker compose -f docker/docker-compose.dev.yml up --build #--build optition is required only for the first time.
```
### Model installation
```sh
☁  chat-server [devel] ⚡  docker exec -it docker-ollama-1 bash
root@331e0b67f36a:/# ollama pull llama3.2
pulling manifest 
pulling dde5aa3fc5ff... 100% ▕█████████████████████████████████████▏ 2.0 GB                         
pulling 966de95ca8a6... 100% ▕█████████████████████████████████████▏ 1.4 KB                         
pulling fcc5a6bec9da... 100% ▕█████████████████████████████████████▏ 7.7 KB                         
pulling a70ff7e570d9... 100% ▕█████████████████████████████████████▏ 6.0 KB                         
pulling 56bb8bd477a5... 100% ▕█████████████████████████████████████▏   96 B                         
pulling 34bb5ab01051... 100% ▕█████████████████████████████████████▏  561 B                         
verifying sha256 digest 
writing manifest 
success 
root@331e0b67f36a:/# ollama pull llama3.2:1b
pulling manifest 
pulling 74701a8c35f6... 100% ▕█████████████████████████████████████▏ 1.3 GB                         
pulling 966de95ca8a6... 100% ▕█████████████████████████████████████▏ 1.4 KB                         
pulling fcc5a6bec9da... 100% ▕█████████████████████████████████████▏ 7.7 KB                         
pulling a70ff7e570d9... 100% ▕█████████████████████████████████████▏ 6.0 KB                         
pulling 4f659a1e86d7... 100% ▕█████████████████████████████████████▏  485 B                         
verifying sha256 digest 
writing manifest 
success 
root@331e0b67f36a:/# ollama pull gemma2:2b
pulling manifest 
pulling 7462734796d6... 100% ▕█████████████████████████████████████▏ 1.6 GB                         
pulling e0a42594d802... 100% ▕█████████████████████████████████████▏  358 B                         
pulling 097a36493f71... 100% ▕█████████████████████████████████████▏ 8.4 KB                         
pulling 2490e7468436... 100% ▕█████████████████████████████████████▏   65 B                         
pulling e18ad7af7efb... 100% ▕█████████████████████████████████████▏  487 B                         
verifying sha256 digest 
writing manifest 
success
```
Check http://localhost:3000/

## How to excute
```sh
docker compose -f docker/docker-compose.dev.yml up
```
Check http://localhost:3000/

