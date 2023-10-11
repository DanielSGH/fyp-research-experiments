import fetch from 'node-fetch';

const headers = {
            "Connection": "keep-alive",
            "Accept": "application/json, text/javascript, */*; q=0.01",
            "X-Requested-With": "XMLHttpRequest",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36",
            "Content-Type": "application/json; charset=UTF-8",
            "Origin": "https://context.reverso.net",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Fetch-Mode": "cors",
            "Referer": "https://context.reverso.net/^%^D0^%^BF^%^D0^%^B5^%^D1^%^80^%^D0^%^B5^%^D0^%^B2^%^D0^%^BE^%^D0^%^B4/^%^D0^%^B0^%^D0^%^BD^%^D0^%^B3^%^D0^%^BB^%^D0^%^B8^%^D0^%^B9^%^D1^%^81^%^D0^%^BA^%^D0^%^B8^%^D0^%^B9-^%^D1^%^80^%^D1^%^83^%^D1^%^81^%^D1^%^81^%^D0^%^BA^%^D0^%^B8^%^D0^%^B9/cat",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
}

let data = {
            "source_text": "cat",
            "target_text": "",
            "source_lang": "en",
            "target_lang": "ru",
            "npage": 1,
            "mode": 0
}

const getNpages = async () => {
    const response = await fetch('https://context.reverso.net/bst-query-service', {
		method: 'POST',
		headers,
		body: JSON.stringify(data)
	});
	
	if (!response.ok)
		throw new Error('something went wrong!');

	const npages = await response.json();
	
	return npages['npages'] || new Error('no npages found!');;
}

const func = async () => {
	const npages = await getNpages();

	for (let npage = 1; npage <= npages; npage++) {
		data['npage'] = npage;

		const response = await fetch('https://context.reverso.net/bst-query-service', {
			method: 'POST',
			headers,
			body: JSON.stringify(data)
		});

		if (!response.ok)
			throw new Error('button click didn\'t work out!');

		const json = await response.json();
		const list = json['list'] || new Error('no list found');
		
		list.forEach(sentence => {
			console.log(sentence.s_text + "\n" + sentence.t_text)
		});
	}
}

func();