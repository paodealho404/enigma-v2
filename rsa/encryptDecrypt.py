import math

DIC = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", " "]

def xgcd(number_x, number_y, return_x_and_y):
        x0, x1, y0, y1 = 0, 1, 1, 0
        while number_x != 0:
                q, number_y, number_x = number_y // number_x, number_x, number_y % number_x
                y0, y1 = y1, y0 - q * y1
                x0, x1 = x1, x0 - q * x1
        if return_x_and_y:
                return number_y, x0, y0
        else:
                return number_y

def inverse_multiplicative(number_e, number_pi):
        gcd, x, y = xgcd(number_e, number_pi, 1)
        if gcd == 1:
                return x % number_pi

def encrypt(text, number_e, number_n, opt):        
        encrypt_text = ""
        if(opt==1):
                for i in range(0, len(text)):
                        letter = DIC.index(text[i])
                        encrypt_text += str(pow(letter, number_e, number_n))
                        if(i+1 != len(text)):
                                encrypt_text += " "
        else:
                for i in range(0, len(text)):
                        letter = ord(text[i])
                        encrypt_text += str(pow(letter, number_e, number_n))
                        if(i+1 != len(text)):
                                encrypt_text += "."
        return encrypt_text

def decrypt(text, number_d, number_n, opt):
        decrypt_text = ""
        if(opt==1):
                i = 0
                while i < len(text):
                        encrypted = ""
                        while (i < len(text) and (48 <= ord(text[i]) <= 57)):
                                encrypted += text[i]
                                i += 1
                        i += 1
                        encrypted = int(encrypted)
                        decrypt_text += DIC[pow(encrypted, number_d, number_n)]
        else:                
                i = 0
                while i < len(text):
                        encrypted = ""
                        while (i < len(text) and (48 <= ord(text[i]) <= 57)):
                                encrypted += text[i]
                                i += 1
                        i += 1
                        encrypted = int(encrypted)
                        decrypt_text += chr(pow(encrypted, number_d, number_n))
        return decrypt_text