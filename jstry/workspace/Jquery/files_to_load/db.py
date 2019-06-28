from pymongo import MongoClient
con = MongoClient("mongodb://Kenta:kenta@ds227325.mlab.com:27325/mybananafry1")
db = con.mybananafry1

users = db.users
print db

# users.insert({"name":"Kenana","age":"3","job":"BananaEater","movies":["The ring","Shining","Akira"],"username":"Chicken","password":"watermelon1234567890"})
# users.insert({"name":"Angelina","age":"56","job":"chef","movies":["Toy stroy 2","Your name","Scream"],"username":"Cow","password":"AppleWater0"})  
# users.insert({"name":"James Jeff","age":"13","job":"computer programmer","movies":["Toy stroy 1","Toy story 2","Godzilla"],"username":"Jonny","password":"BananaRots701"})

#db.fri.insert({'you','kenta'})
# list1=[]
# for i in range(len(users.distinct("age"))):
#     if int(users.distinct("age")[i]) < 30:
#         list1.append(int(users.distinct("age")[i]))
# print list1

# def adduser(name,age,job,movies,username,password,confirmpassword):
#     if type(name)!=str:
#         return 'your name should be a string!'
#     if age!=int:
#         return 'your age should be a integer!'
#     if job!=str:
#         return 'your job is a word right?? pleasee make it a string I beg you'
#     if movies!=tuple or movies!=list or movies!=dict:
#         return 'I need more than 2 movies from you!'
#     if username!=str:
#         return 'your username should be a string!!!!'
#     if int not in password:
#         return 'I need a int!'
#     if password==confirmpassword:
#         return 'I need morer than 2 movies from you!'
    
    
# print adduser('kenta',6,'car',['67','82'],'kentaa',675,675)