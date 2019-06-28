import matplotlib
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(-10,10,500)
y = np.linspace(-10,10,500)[:, None]

# x = numpy.linspace(-2., 2.)
# y = numpy.linspace(-2., 2.)[:, None]
plt.contour(x, y.ravel(), (x/7)**2+(y/3)**2, [1])

# vv using this method makes complex number not appearing in plane vv
# plt.plot(x,np.sqrt(abs(abs(x)-1)/(abs(x)-1)), 'ro')
# plt.show()
# plt.plot(x,y, 'ro')
plt.show()