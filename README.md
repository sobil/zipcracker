# zipcracker
Simple node based zip cracker using [minizip](https://github.com/rf00/minizip-asm.js)

Includes a basic wordlist from [SecLists](https://github.com/danielmiessler/SecLists)

##Install

```
git clone git@github.com:sobil/zipcracker.git
cd zipcracker
npm install -g
```

##Usage

```
zipcracker -f ./zipfile_to_crack.zip -w ./wordlist.txt
```


##Issues/TODO

Only runs on single core - add worker_threads