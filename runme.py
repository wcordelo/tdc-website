import socket
def get_ip_address():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(("8.8.8.8", 80))
    return s.getsockname()[0]

ip = get_ip_address()
f = open('server.js', 'r')
lines = f.readlines()
f.close()

count = 0
for line in lines:
    if not line.find('##replace me##') == -1:
        lines[count] = line.replace('##replace me##', "'" + str(ip) + "'")
        break
    count +=1

g = open('server.js', 'w')
g.writelines(lines)
g.close()
