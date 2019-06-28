#include <iostream>
#include <sstream>
#include <list>
using namespace std;

int denToDec( int denary ) {
    std::list<int> binary;
    while(denary>0) {
        binary.push_front(denary%2);
        denary=denary/2;
    }
    
    int result = 0;
      for(int v : binary){
        result*=10;
        result+=v;
      }
     return result;
}

int main() {
    cout << denToDec(7);
    return 0;
}