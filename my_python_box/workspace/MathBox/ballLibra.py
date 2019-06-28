import random
class Ball():
    balls=[]
    def __init__(self,**kwarg):
        self.x=float(kwarg.get('x',0))
        self.y=float(kwarg.get('y',0))
        self.r=10
        self.m=float(kwarg.get('m',1))
        if self.m==0:
            raise "Dude! What Is A Massless Ball?!"

        self.color=(random.randint(0,200)/255.0,
                   random.randint(0,200)/255.0,
                   random.randint(0,200)/255.0)
        self.Vx=0.0
        self.Vy=0.0
        self.Ax=0.0
        self.Ay=0.0
        Ball.balls.append(self)
    def move(self,**kwarg):
        # getting applied forces if any
        self.Fx=kwarg.get('Fx',random.randint(-1,1)*2)
        self.Fy=kwarg.get('Fy',random.randint(-1,1)*2)

        # calculate the Accelarion 
        self.Ax=self.Fx/self.m
        self.Ay=self.Fy/self.m

        # calculate the velocity
        self.Vx+=self.Ax
        self.Vy+=self.Ay

        # calculate the position
        self.x+=self.Vx
        self.y+=self.Vy

        if self.x>250:
            self.x=250-(self.x-250)
            self.Vx*=-1

        if self.y>250:
            self.y=250-(self.y-250)
            self.Vy*=-1

        if self.x<-250:
            self.x=-250-(self.x+250)
            self.Vx*=-1

        if self.y<-250:
            self.y=-250-(self.y+250)
            self.Vy*=-1

        

        
