package com.java.springbootstarter.library;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LibraryService {
	
	

	/*private List<Library> libraries  =new ArrayList<>( Arrays.asList(new Library("Lib1","Lib1 Name","Lib on 1st floor")
			,new Library("Lib2","Lib2 Name","Lib on 2nd floor")
			,new Library("Lib3","Lib3 Name","Lib on 3rd floor")));*/
	
	@Autowired
	private LibraryRepository libraryRepository;

	public List<Library> getAllLibraries(){
		//return libraries;
		List<Library> libraries = new ArrayList<>();
		libraryRepository.findAll().forEach(libraries::add);
		return libraries;
	}

	public Library getLibrary(String id) {
		//return libraries.stream().filter(t -> t.getId().equals(id)).findFirst().get();
		return libraryRepository.findById(id).get();

	}

	public void addLibrary(Library library) {
		//libraries.add(library);
		libraryRepository.save(library);
	}
	
	public void updateLibrary(Library library,String id) {

		/*for(int i=0;i<libraries.size();i++) {
			Library obj = libraries.get(i);
			if(obj.getId().equals(id)) {
				libraries.set(i,library);
				return;
			}
		}*/
		
		libraryRepository.save(library);
	}
	
	public void deleteLibrary(String id ) {
		//libraries.removeIf(t -> t.getId().equals(id));
		libraryRepository.deleteById(id);
	}
	
}
