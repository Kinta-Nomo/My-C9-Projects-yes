
def binary(den)
    bin = ''
    until den <= 0 do
        bin=(den%2).to_s+bin
        den=(den.to_i/2).floor
    end
    return bin
end

puts binary(1000)