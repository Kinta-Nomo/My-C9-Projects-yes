import turtle
import random
from turtle import *
from math import *


tom = turtle.Turtle()
tom.speed(100)
tom.tracer(100)
tom.width(1)
tom.ht()
turtle.colormode(255)

tom.lt(90)
tom.pu()
tom.goto(0,-300)
tom.pd()

mindis = 0
maxdis = 100

class Leaf:
    def __init__(self):
        
        self.x=random.randint(-300,300)
        self.y=random.randint(-50,300)
        self.reached = False
        
    def create(self):
        tom.color(0,100,0)
        
        tom.pu()
        tom.goto(self.x,self.y)
        tom.width(7)
        tom.pd()

        tom.rt(random.randint(0,359))
        tom.fd(4)
        tom.color(0,0,0)
        tom.width(1)
        
class Branch:
    def __init__(self,pos,parent,direc):
        self.pos = pos
        self.parent = parent
        self.direc = direc

    def gonext(self):
        #under here is terror
        nextBranch = Branch((self.pos[0] + abs(5*round(cos(degrees(self.direc)))),self.pos[1] + abs(5*round(sin(degrees(self.direc))))),self,self.direc)
        return nextBranch

    
    def drawbr(self):
        if (self.parent != None):
            tom.pu()
            tom.goto(self.pos[0],self.pos[1])
            tom.pd()
            tom.goto(self.parent.pos[0],self.parent.pos[1])
    
    
class Tree:
    def __init__(self):
        self.leaves = [Leaf() for i in range(100)]
        self.branches=[]
        self.found = None
        
    def grow(self):
        for leaf in self.leaves:
            closestBranch = None
            record = 10000
            for branch in self.branches:
                distance = sqrt(abs(branch.pos[0] - leaf.x)**2 + abs(branch.pos[1] - leaf.y)**2 )
                if mindis > distance:
                    #break because we found one
                    leaf.reached = True
                    closestBranch = None
                    break
                elif maxdis < distance:
                    #not much to it even branch is far from leaf because its just attracting
                    pass
                elif closestBranch == None or distance < record:
                    #checks if there are closer leaf || there is still nothing
                    closestBranch = branch
                    record = distance
            if closestBranch != None:
                print closestBranch.pos,(leaf.x,leaf.y)
                newpoints = leaf.x-closestBranch.pos[0] , leaf.y-closestBranch.pos[1]
                newline = degrees(atan(newpoints[1]/newpoints[0]))
                tom.pd()
                tom.setheading(newline)
                tom.fd(1000)
                tom.pu()
                print newpoints
                print newline
                    
       
    def showleaves(self):
        for leaf in self.leaves:
            leaf.create()   
        for Lbranch in self.branches:
            Lbranch.drawbr()   

    def root(self):
        global branch
        branch = Branch((0,-300),None,90)
        self.branches.append(branch)
        
    def findleaves(self):
        self.found = False
        while self.found == False:
            for leaf in self.leaves:
                if mindis < sqrt(abs(branch.pos[0] - leaf.x)**2 + abs(branch.pos[1] - leaf.y)**2 ) < maxdis:
                    self.found = True
            if self.found == False:
                global branch
                branch = branch.gonext()
                self.branches.append(branch)
                

    
tree = Tree()
tree.root()
tree.findleaves()
tree.showleaves()
tree.grow()

turtle.done()
