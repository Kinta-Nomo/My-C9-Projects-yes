
#somehow very slow ):
import turtle
tom=turtle.Turtle()
tom.ht()
tom.width(10)
tom.tracer(100)

sands={(0,0):10000}
newsands={(0,0):1000}

def checksand(sand,sands):
    if sand in sands:
        newsands[sand]+=1
    else:
        newsands[sand] = 1

while True:
    for sand in sands:
        if sands[sand]>=4:
            newsands[sand] -= 4
            checksand((sand[0]+1,sand[1]),sands)
            checksand((sand[0]-1,sand[1]),sands)
            checksand((sand[0],sand[1]+1),sands)
            checksand((sand[0],sand[1]-1),sands)
        if sands[sand]==1:
            tom.color("yellow")
        elif sands[sand]==2:
            tom.color("orange")
        elif sands[sand]==3:
            tom.color("brown")
        else:
            tom.color("black")
        tom.pu()
        tom.goto(sand[0]*8,sand[1]*8)
        tom.pd()
        tom.fd(0.01)
    sands = dict(newsands)
    
turtle.done()
