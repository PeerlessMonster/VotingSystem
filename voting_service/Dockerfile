FROM python:3.14.0-slim-trixie

WORKDIR /code

# `docker-compose.yml` 中指定 context 为项目根目录，相对路径从该目录开始
COPY requirements.txt .

RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY common /code/common
COPY ./voting_service/app /code/app

EXPOSE 80

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "80"]