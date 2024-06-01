FROM python

WORKDIR /app

COPY ./app /app

CMD ["python", "rng.py"]