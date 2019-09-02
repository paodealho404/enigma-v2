from random import randint

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

def random_number(length):
        range_start = 10**(length-1)
        range_end = (10**length)-1
        number = randint(range_start, range_end) | 1
        return number

def is_prime(number, strength):
        if number == 2 or number == 3:
                return True
        if number <= 1 or number % 2 == 0:
                return False
        for i in range(0, strength):
                a = randint(1, number-1)
                if (pow(a, number-1, number) != 1):
                        return False 
        return True

def random_prime_number(length, strength):
        number = 4
        while not is_prime(number, strength):
                number = random_number(length)
        return number

def number_e(pi_n):
        number = 2
        while not (xgcd(number, pi_n, 0) == 1) and number < pi_n:
                number = randint(2, pi_n-1)                
        return number