from reverso_api.context import ReversoContextAPI


api = ReversoContextAPI("cat", "", "en", "ru")
for source, target in api.get_examples():
    print(source.text, "\n", target.text)