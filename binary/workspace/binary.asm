.model small
.data
    msg db 'hi' , 'GOOG'
.code

main proc   

    mov ch, 255    ;start from heee! (below 255)  
    mov bl , 2   ;divisor 2!  
    
    looper:             
    
        and ax, 0ffh ;clear ah
        mov al, ch;set al to ch
    
          
        div bl       ;divide ax/2(dl)
        mov dl, ah   ;dl is the remainder!  
        add dl, 48   ;ajdust ascii of dl
        
        and ax, 0ffh ;clear ah         
        
        cmp al, 0    ;compare al and 0 -> goes to jle
        
        mov ch, al   ;store al into ch as al changes with next 2 
        
        mov ah, 2h ;print
        int 21h    ;print2
        
        jle looper2  ;escape if al is less or equals to 0   
        
        loop looper  
        
        
        
    looper2:
    
                        
       
    
endp
end main