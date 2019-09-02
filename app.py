import os
from rsa import keys, encryptDecrypt
from flask import Flask, escape, request, render_template, jsonify
from flask_cors import CORS

app = Flask(__name__, template_folder = 'templates', static_folder = 'templates/')

cors = CORS(app, resource={r"/*":{"origins": "*"}})

@app.route("/", methods=['GET'])
def index():
    return render_template("index.html")

@app.route("/generate-keys", methods=['POST'])    
def generateKeys():    
    opt = int(request.form.get("opt"))
    if(opt==1):
        p = int(request.form.get("p"))
        q = int(request.form.get("q"))   
        e = int(request.form.get("e"))
        n = p*q
        return jsonify(n=str(n),e=str(e))
    else:
        tam = int(request.form.get("tam"))            
        p = keys.random_prime_number(tam, 256)
        q = keys.random_prime_number(tam, 256)           
        pi=(p-1)*(q-1)     
        e = keys.number_e(pi)
        return jsonify(p=str(p),q=str(q),e=str(e))

@app.route("/encrypt", methods=['POST'])    
def encrypt():    
    txt = request.form.get("txt")
    e = int(request.form.get("e"))
    n = int(request.form.get("n"))
    opt = int(request.form.get("opt"))
    crypt = encryptDecrypt.encrypt(txt,e,n,opt)
    return jsonify(crypt=str(crypt))

@app.route("/decrypt", methods=['POST'])    
def decrypt():    
    txt = request.form.get("txt")
    p = int(request.form.get("p"))
    q = int(request.form.get("q"))
    e = int(request.form.get("e"))
    opt = int(request.form.get("opt"))
    n = p*q
    pi=(p-1)*(q-1)
    d = encryptDecrypt.inverse_multiplicative(e, pi)
    decrypt = encryptDecrypt.decrypt(txt,d,n,opt)
    return jsonify(decrypt=str(decrypt))

                
def main():
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)

if __name__ == "__main__":
    main()