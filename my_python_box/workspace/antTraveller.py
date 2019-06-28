import random
import numpy as np
import matplotlib.pyplot as plt


Foods=[(100,100)]

def Distance(f,b):
    return min([((a[0]-b[0])**2+(a[1]-b[1])**2)**0.5 for a in f])
    

class Ant(object):
    Screen=np.zeros((1000,1000))
    antsLocation=np.zeros((1000,1000))
    Ants=[]
    Paths=[]
    def imgeIt(self):
        
        for ant in Ant.Ants:
            x,y=ant.location
            Ant.antsLocation[x+500][y+500]+=1
        
        fig, ax = plt.subplots()

        image = Ant.antsLocation   
        ax.imshow(image, cmap=plt.cm.gray, interpolation='nearest')
        ax.set_title('dropped spines')

        # Move left and bottom spines outward by 10 points
        ax.spines['left'].set_position(('outward', 10))
        ax.spines['bottom'].set_position(('outward', 10))
        # Hide the right and top spines
        ax.spines['right'].set_visible(False)
        ax.spines['top'].set_visible(False)
        # Only show ticks on the left and bottom spines
        ax.yaxis.set_ticks_position('left')
        ax.xaxis.set_ticks_position('bottom')
        ###print sum(sum(Ant.antsLocation))
        plt.show()
        return sum(sum(Ant.antsLocation))
        
    def __init__(self):
        self.craze=random.choice([True,False])
        self.selectedPath=[]
        self.found=False
        self.path=[]
        self.location=(0,0)
        self.age=0
        Ant.Ants.append(self)
    def Die(self):
        Ant.Ants.remove(self)
        
    def findPath(self):
        # im getting old
        self.age+=1
        '''
        if self.age>50:
            self.Die()
            return None
        '''

        # I am carring Food to home
        if self.found:
            if self.craze:
                if self.path:
                    self.location = self.path.pop(-1)
                else:
                    self.found=False
            else:
                if self.path:
                    self.location = self.selectedPath.pop(-1)
                else:
                    self.found=False
        else:    
            # im crazy, going everyweher to find food
            if self.craze:
                x,y=self.location
                self.location=(x+random.randint(-10,10),y+random.randint(-10,10))
                self.path.append(self.location)
                if Distance(Foods,self.location)<10:
                    self.found=True
                    Ant.Paths.append(self.path[::])
            else:
                #print 'im not crazy'
                if not(self.selectedPath):
                    if Ant.Paths:
                        self.selectedPath=random.choice(Ant.Paths)
                    else:
                        self.craze=True
                else:
                    self.location=self.selectedPath.pop(0)
                    if not(self.selectedPath):
                        self.found = True
                
for i in range(500):
    Ant()
#for j in range(100):
    for ant in Ant.Ants:
        ant.findPath()

print len(Ant.Paths)
Ant().imgeIt()
