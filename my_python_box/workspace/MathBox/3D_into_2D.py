
#final version 
tom=Turtle()
tom.ht()
tom.speed(100)
tom.tracer(20)
tom.color('green')
from math import *

def drawFace(points,fillColor,width):
    tom.goto(points[0])
    tom.color('black',fillColor)
    tom.begin_fill()
    tom.width(width)
    for point in points+[points[0]]:
        tom.goto(point)
    tom.end_fill()
    
def getX(point,observer):
    if point[1]-observer[1]!=0:
    	r=point[1]/float(point[1]-observer[1])
    else:
        r=point[1]/float(point[1]-(observer[1]+0.00000000001))
    x=point[0]-(point[0]-observer[0])*r
    return x

def d(pointa,pointb,axis):
    if axis==[0,1]:
    	return ((pointa[0]-pointb[0])**2+(pointa[1]-pointb[1])**2)**0.5
    elif axis==[0,2]:
    	return ((pointa[0]-pointb[0])**2+(pointa[2]-pointb[2])**2)**0.5
    elif axis==[1,2]:
    	return ((pointa[1]-pointb[1])**2+(pointa[2]-pointb[2])**2)**0.5

def initialAngle(a,o,rotateStat):
    if a[rotateStat[0]]-o[rotateStat[0]]!=0:
        degree=degrees(atan(float(a[rotateStat[1]]-o[rotateStat[1]])/float(a[rotateStat[0]]-o[rotateStat[0]])))
    else:
	    degree=degrees(atan(float(a[rotateStat[1]]-o[rotateStat[1]])/0.00000001))
    if a[rotateStat[0]]<o[rotateStat[0]]:
        degree+=180
    return degree
    
def bearing(o,d,alpha,point,rotateStat):
    if rotateStat == [0,1]:
    	return cos(radians(alpha))*d+o[0],sin(radians(alpha))*d+o[1],point[2]
    elif rotateStat == [0,2]:
    	return cos(radians(alpha))*d+o[0],point[1],sin(radians(alpha))*d+o[2]
    elif rotateStat == [1,2]:
    	return point[0],cos(radians(alpha))*d+o[1],sin(radians(alpha))*d+o[2]

def rotate(point,o,alpha,rotateStat):
    r=d(point,o,rotateStat)
    fialAngle=initialAngle(point,o,rotateStat)+alpha
    newPoint=bearing(o,r,fialAngle,point,rotateStat)
    
    return newPoint

def rorateObject(MyObject,o,alpha,rotateStat):
    
    for i in range(len(MyObject)):
        rotatedCoordinates= [rotate(a,o,alpha,rotateStat) for a in dict(MyObject[i])['coordinate']]
        
        MyObject[i]['coordinate']=rotatedCoordinates[::]

        
    return MyObject 


pointsObjects=[{'color':'white','coordinate':[(100,100,100),(100,200,100),(200,200,100),(200,100,100)]},
                                     {'color':'blue','coordinate':[(200,100,100),(200,200,100),(200,200,200),(200,100,200)]},
                                     {'color':'purple','coordinate':[(100,200,100),(200,200,100),(200,200,200),(100,200,200)]},
                                     {'color':'yellow','coordinate':[(200,200,200),(100,200,200),(100,100,200),(200,100,200)]},
                                     {'color':'green','coordinate':[(100,100,100),(100,200,100),(100,200,200),(100,100,200)]},
                                     {'color':'red','coordinate':[(100,100,100),(200,100,100),(200,100,200),(100,100,200)]}]

alpha=0
for alpha in range(10000):
    observer=(-200,-500,-200)
    o=(150,150,150)
    
    for i in range(20):
        tom.pu()
        tom.fd(1)

    newPoints=[]
    for face in pointsObjects:
        newPoints.append(dict(face))
    projectPoints=rorateObject(newPoints,o,alpha,[1,2])
    projectPoints=rorateObject(projectPoints,o,alpha,[0,2])
    projectPoints=rorateObject(projectPoints,o,alpha,[0,1])
    
    for faces in projectPoints:
        projectedPoints=[(getX((i[0],i[1]),(observer[0],observer[1])),getX((i[2],i[1]),(observer[2],observer[1]))) for i in faces['coordinate']]

        drawFace(projectedPoints,faces['color'],5)
    tom.pd()
    tom.width(1000)
    tom.color('black')
    tom.fd(0.001)
    tom.width(1)
    
        
    
