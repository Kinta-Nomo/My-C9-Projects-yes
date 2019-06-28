import java.util.*;
import java.lang.*;
import java.io.*; 

public class binary {
    
    public static int convert(int num) {
        String bin = "";
        while (num > 0){
            bin=num%2+bin;
            num=num/2;
        }
        return Integer.parseInt(bin);
    }
    
   public static void main(String []args) {
      System.out.println( convert(60) );
   }
}
