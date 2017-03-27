
#!/usr/bin/python
import httplib
import  sys
import time

def main(ip,port,file):
	conn = httplib.HTTPConnection(ip,port)
	time
	conn.request('GET','/'+file)
	res = conn.getresponse()

	start = time.time()
	if(res.status != 200):
		print 'Status Code: '+str(res.status)+' '+res.reason
		print 'RTT = ',time.time()-start,'seconds'
		res.close()
		conn.close()
		return
	print 'Status Code: '+str(res.status) +' '+res.reason
	file = open(file,'w')
	file.write(res.read())
	print 'RTT = ',time.time()-start, 'seconds'	
	res.close()
	conn.close()



try:
	ip = sys.argv[1]
	port = sys.argv[2]
	file = sys.argv[3]
	print 'ip = '+ip+' port = '+port+' file name = '+file
	main(ip,port,file)
except IndexError:
	print 'not enough parms'
except:
	print 'unable to connect'




	