// A Hello World! program in C#.
using System;

namespace denaryToBinary{
    class den_to_bin{
        static int convert(int den) {
            string bin = "";
            while(den>0){
                bin = bin.Insert(0,(den%2).ToString());
                den = den/2;
            }
            
            return Int32.Parse(bin);
        }
        
        static void Main() 
        {
            Console.WriteLine(convert(390));
        }
    }
}