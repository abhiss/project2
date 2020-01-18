import shutil
import os

basedir = os.getcwd();
destdir = basedir + '/built/public/'
srcdir = basedir + '/src/public/'

if os.path.isdir(destdir):
    shutil.rmtree(destdir)
else:
    os.makedirs(basedir+'/built')
    print "had to make dir /built"

shutil.copytree(srcdir, destdir)
print destdir
print os.walk(destdir)

for subdir, dirs, files in os.walk(destdir):
    for file in files:
        filepath = os.path.join(subdir, file)
        #filepath = subdir + os.sep + file

        if filepath.endswith(".ts"):
            print (filepath)
            os.remove(filepath)