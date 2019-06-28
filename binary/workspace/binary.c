
#include <stdio.h>
#include <math.h>

int max(int denary) {
  
  int binsize = 0;
	int binary[1000] = {0};
	
	for (int i = 0;denary > 0 && i<1000;i++) {
		binary[i] = denary % 2;
		denary = denary / 2;
		binsize += 1;
	}
	
    int result = 0;
  for(int k=0; k < binsize; k++){
    result*=10;
    result+=binary[k];
  }
  
  return result;
}

void main() {
	printf("%d",max(390));
}
 