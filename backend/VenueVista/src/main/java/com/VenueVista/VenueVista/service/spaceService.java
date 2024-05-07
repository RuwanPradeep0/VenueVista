package com.VenueVista.VenueVista.service;

import com.VenueVista.VenueVista.dto.spaceDTO;
import com.VenueVista.VenueVista.models.space;
import com.VenueVista.VenueVista.repository.spaceRepository;
import com.VenueVista.VenueVista.util.VarList;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional

public class spaceService {

    @Autowired
    private spaceRepository spaceRepo;

    @Autowired
    private ModelMapper modelMapper;

    public spaceService() {
    }


    public String saveSpace(spaceDTO spazDTO){
        if (spaceRepo.existsById(spazDTO.getTempID())){
            return VarList.RSP_DUPLICATED;
        }else {
            spaceRepo.save(modelMapper.map(spazDTO, space.class));
            return VarList.RSP_SUCCESS;
        }
    }
    public String updateSpace(spaceDTO spazDTO){
        if (spaceRepo.existsById(spazDTO.getTempID())){
            spaceRepo.save(modelMapper.map(spazDTO, space.class));
            return VarList.RSP_SUCCESS;

        }else {
            return VarList.RSP_NO_DATA_FOUND;
        }
    }
    public List<spaceDTO> getAllSpace(){
        List<space> employeeList = spaceRepo.findAll();
        return modelMapper.map(employeeList,new TypeToken<ArrayList<spaceDTO>>(){
        }.getType());
    }

    public spaceDTO searchSpace(int tempID){
        if (spaceRepo.existsById(tempID)){
            space employee =spaceRepo.findById(tempID).orElse(null);
            return modelMapper.map(employee,spaceDTO.class);
        }else {
            return null;
        }
    }
    public String deleteSpace(int tempID){
        if (spaceRepo.existsById(tempID)){
            spaceRepo.deleteById(tempID);
            return VarList.RSP_SUCCESS;
        }else {
            return VarList.RSP_NO_DATA_FOUND;
        }
    }
}
