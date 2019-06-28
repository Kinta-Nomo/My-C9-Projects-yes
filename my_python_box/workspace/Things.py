tom = Turtle()
tom.shape('turtle')
tom.speed(100)
tom.tracer(100)
tom.color('green')
class Vector(object):
    def __init__(self,x,y):
        self.x=float(x)
        self.y=float(y)
    def __mul__(self,n):
        self.x*=n
        self.y*=n
    def __repr__(self):
        return str((self.x,self.y))
        
class Thing(object):
    things=[]
    def __init__(self,name,x,y,m):
        self.name=name
        self.l=Vector(x,y)
        self.m=m
        self.a=Vector(0,0)
        self.V=Vector(0,0)
        Thing.things.append(self)
        
    def push(self,f):
        self.a.x=f.x/self.m
        self.a.y=f.y/self.m
        
        self.V.x+=self.a.x
        self.V.y+=self.a.y
        
        self.a.x=0
        self.a.y=0
        
    def move(self):
        self.l.x+=self.V.x
        self.l.y+=self.V.y

    def __repr__(self):
        return str((self.name,self.l.x,self.l.y))

def distance(a,b):
    return ((a.l.x-b.l.x)**2+(a.l.y-b.l.y)**2)**0.5

def applyGravity(a,b):
    GC=6.67*10**-2
    F=(GC*a.m*b.m)/(distance(a,b)**2)
    
    Fv=Vector((F/distance(a,b))*(a.l.x-b.l.x),(F/distance(a,b))*(a.l.y-b.l.y))
 #   print Fv,'im here'
  #  print Fv*-1,'im here'
  #  a.push(Fv)
  #  b.push(Fv*-1)
    return Fv,Fv*-1
        

f=Vector(2,2)        
Thing('earth',10,20,2000)
Thing('moon',-10,200,20)
Thing('sun',-10,210,210)
T= Thing.things

for r in range(10):
    for i in range(len(Thing.things)-1):
        for j in range(i+1,len(Thing.things)):
            print applyGravity(T[i],T[j])
    for i in Thing.things:
        i.move()
