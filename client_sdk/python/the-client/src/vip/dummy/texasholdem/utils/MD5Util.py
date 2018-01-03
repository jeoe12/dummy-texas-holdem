import hashlib


class MD5Util():
    def MD5Encode(self, origin, charsetname):
        resultString = None
        try:
            if charsetname is None or charsetname.strip() == '':
                resultString = hashlib.md5(origin.encode('utf-8')).hexdigest()
            else:
                resultString = hashlib.md5(origin.encode('utf-8')).hexdigest(charsetname)
            print(md5)
        except Exception, e:
            print e.message

        return resultString
