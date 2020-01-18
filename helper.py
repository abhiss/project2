import shutil
import os

basedir = os.getcwd();
destpubdir = basedir + '/built/public/'
srcpubdir = basedir + '/src/public/'

if os.path.isdir(destpubdir):
    shutil.rmtree(destpubdir)
    shutil.rmtree(basedir+'/built/config/')

else:
    os.makedirs(basedir+'/built')
    print "had to make dir /built"

shutil.copytree(srcpubdir, destpubdir)
shutil.copytree(basedir+'/src/config/', basedir+'/built/config/')

for subdir, dirs, files in os.walk(destpubdir):
    for file in files:
        filepath = os.path.join(subdir, file)
        #filepath = subdir + os.sep + file
        if filepath.endswith(".ts"):
            print (filepath)
            os.remove(filepath)