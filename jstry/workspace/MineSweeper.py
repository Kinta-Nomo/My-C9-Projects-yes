from flask import Flask, render_template,request
app = Flask(__name__)
  
import pickle

@app.route('/scoreBoard')
def hello_admin():
  return render_template('index.html')

@app.route('/')
def hello_admin2():
  return render_template('MS.html')


if __name__ == "__main__":
    app.run(debug = True,host = "0.0.0.0",port = 8080)
    
