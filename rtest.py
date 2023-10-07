from bs4 import BeautifulSoup
import requests
import json


headers = {
    "Connection": "keep-alive",
    "Accept": "application/json, text/javascript, */*; q=0.01",
    "X-Requested-With": "XMLHttpRequest",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36",
    "Content-Type": "application/json; charset=UTF-8",
    "Content-Length": "96",
    "Origin": "https://context.reverso.net",
    "Sec-Fetch-Site": "same-origin",
    "Sec-Fetch-Mode": "cors",
    "Referer": "https://context.reverso.net/^%^D0^%^BF^%^D0^%^B5^%^D1^%^80^%^D0^%^B5^%^D0^%^B2^%^D0^%^BE^%^D0^%^B4/^%^D0^%^B0^%^D0^%^BD^%^D0^%^B3^%^D0^%^BB^%^D0^%^B8^%^D0^%^B9^%^D1^%^81^%^D0^%^BA^%^D0^%^B8^%^D0^%^B9-^%^D1^%^80^%^D1^%^83^%^D1^%^81^%^D1^%^81^%^D0^%^BA^%^D0^%^B8^%^D0^%^B9/cat",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
}

data = {
    "source_text": "cat",
    "target_text": "",
    "source_lang": "en",
    "target_lang": "ru",
    "npage": 1,
    "mode": 0
}

npages = requests.post("https://context.reverso.net/bst-query-service", headers=headers, data=json.dumps(data)).json()["npages"]
for npage in range(1, npages + 1):
    data["npage"] = npage
    page = requests.post("https://context.reverso.net/bst-query-service", headers=headers, data=json.dumps(data)).json()["list"]
    for word in page:
        print(BeautifulSoup(word["s_text"]).text, "=", BeautifulSoup(word["t_text"]).text)
